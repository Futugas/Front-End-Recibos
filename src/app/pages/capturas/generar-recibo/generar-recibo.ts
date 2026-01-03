import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { Header } from '../../../shared/header/header';

import { Cliente } from '../../interfaces/operaciones.interface';

import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-generador-recibo',
  standalone: true,
  imports: [Header, FormsModule, CommonModule],
  templateUrl: './generar-recibo.html',
})
export class GenerarRecibo implements OnInit {

  router = inject(Router);
  storeService = inject(StoreService);
  cdr = inject(ChangeDetectorRef);

  cliente: Cliente | null = null;

  fechaLimitePago = '';
  fechaInicial = '';
  fechaFinal = '';

  imagenMedidor = '';
  archivoImagen: File | null = null;

  lecturaFinal = 0;
  lecturaInicial = 0;
  consumoM3 = 0;
  consumoLitros = 0;
  importe = 0;
  totalRecibo = 0;
  cargo = 0;

  generandoPDF = false;
  mostrarModal = false;
  modalMensaje = '';
  modalTipo: 'success' | 'error' = 'success';

  ngOnInit(): void {
    this.cliente = this.storeService.getLecturaTabla();
    console.log('CLIENTE', this.cliente);

    if (!this.cliente) {
      this.abrirModal('No se encontraron datos del cliente', 'error');
      setTimeout(() => this.regresar(), 2000);
      return;
    }

    const hoy = new Date();
    const mesAnterior = new Date(hoy);
    mesAnterior.setMonth(mesAnterior.getMonth() - 1);

    this.fechaInicial = this.formatearFecha(mesAnterior);
    this.fechaFinal = this.formatearFecha(hoy);

    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + 15);
    this.fechaLimitePago = this.formatearFecha(fechaLimite);
  }

  private llenarTablaPdf(): void {
    this.lecturaInicial = +localStorage.getItem('lecturaAnt')!;
    this.lecturaFinal = +localStorage.getItem('lectura')!;
    this.consumoM3 = this.lecturaFinal - this.lecturaInicial;
    this.consumoLitros = this.consumoM3 * this.cliente?.factor!;
    this.importe = this.consumoLitros * this.cliente?.precio!;
    this.cargo = this.cliente?.cargo!;
    this.totalRecibo = this.importe + this.cargo;
  }

  private formatearFecha(fecha: Date): string {
    return fecha.toISOString().split('T')[0];
  }

  onImagenSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;

    this.archivoImagen = input.files[0];

    const reader = new FileReader();
    reader.onload = e => {
      this.imagenMedidor = e.target?.result as string;
    };
    reader.readAsDataURL(this.archivoImagen);
  }

  private async esperarImagenes(element: HTMLElement): Promise<void> {
    const images = Array.from(element.querySelectorAll('img'));

    await Promise.all(
      images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise<void>(resolve => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      })
    );
  }

  async generarPDF(): Promise<void> {
    if (!this.cliente) return;

    this.llenarTablaPdf();
    this.generandoPDF = true;

    const element = document.getElementById('recibo-content');
    if (!element) {
      this.abrirModal('No se encontró el recibo', 'error');
      this.generandoPDF = false;
      return;
    }

    const container = element.parentElement;
    container?.classList.remove('hidden');

    await new Promise(r => setTimeout(r, 200));

    await this.esperarImagenes(element);

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Recibo_${this.cliente.referencia}.pdf`);

      this.cdr.detectChanges();
      this.abrirModal('PDF generado correctamente', 'success');

    } catch (e) {
      console.error(e);
      this.cdr.detectChanges();
      this.abrirModal('Error al generar el PDF', 'error');
    } finally {
      container?.classList.add('hidden');
      this.generandoPDF = false;
      this.cdr.detectChanges();
    }
  }

  private abrirModal(msg: string, tipo: 'success' | 'error'): void {
    this.modalMensaje = msg;
    this.modalTipo = tipo;
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.cdr.detectChanges();
  }

  regresar(): void {
    this.router.navigate(['/zona-area-edificio-depto']);
  }

  formatearFechaDisplay(fecha: string): string {
    if (!fecha) return '';
    const [anio, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${anio}`;
  }

}
