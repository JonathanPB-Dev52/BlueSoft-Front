import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { ServicesHttpService } from 'src/Services/ServicesHttp.service';
import { CiudadInterface, TipoClienteInterface, TipoCuentaInterface, TipoMovimientoInterface } from '../Interfaces/LlavesForaneasInterface';
import { ClienteDetalle } from '../Interfaces/DetalleClienteInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ClienteDetalle',
  templateUrl: './ClienteDetalle.component.html',
  styleUrls: ['./ClienteDetalle.component.css']
})
export class ClienteDetalleComponent implements OnInit {

  panelOpenState = false;
  ListTipoCLiente: TipoClienteInterface[]= [];
  ListTipoCuenta: TipoCuentaInterface[]= [];
  ListCiudad: CiudadInterface[]= [];
  ListTipoMovimiento: TipoMovimientoInterface[]= [];
  ListaClienteDetalle: ClienteDetalle[]=[];
  ClientesFilter:any = {numeroIdentificador:''};
  FormRegister: FormGroup<any>;
  FormRegisterI: FormGroup<any>;
  FormRegisterII: FormGroup<any>;
  FormRegisterTrans: FormGroup<any>;
  p: number = 1;
  itemsPerPage: number = 5;
  
  constructor(private http:ServicesHttpService, private router:Router) { 
    this.ConsultarForaneas();
    this.consultarDetalleCliente();
    this.FormRegister = new FormGroup({
      pnombre: new FormControl('', [Validators.required]),
      snombre: new FormControl('', [Validators.required]),
      papellido: new FormControl('', [Validators.required]),
      sapellido: new FormControl('', [Validators.required]),
    });
    this.FormRegisterI = new FormGroup({
      fechaNacimiento: new FormControl('', [Validators.required]),
      idTipoCliente: new FormControl('', [Validators.required]),
      numeroIdentificador: new FormControl('', [Validators.required]),
      numeroCuenta: new FormControl('', [Validators.required]),
    });
    this.FormRegisterII = new FormGroup({
      saldoCuenta: new FormControl('', [Validators.required]),
      idCiudad: new FormControl('', [Validators.required]),
    });
    this.FormRegisterTrans = new FormGroup({
      numeroCuenta: new FormControl('', [Validators.required]),
      monto: new FormControl('', [Validators.required]),
      TipoMovimiento: new FormControl('', [Validators.required]),
      idCiudad: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
  }

  consultarDetalleCliente(){
    this.http.ConsultarCLienteDetalle().subscribe((resp:any) =>{
      this.ListaClienteDetalle = resp.obsjeto;
    });
  }

  ConsultarForaneas(){
    this.http.ConsultarTipoCliente().subscribe((resp:any) =>{
      this.ListTipoCLiente = resp.obsjeto;
    });
    this.http.ConsultarTipoCuenta().subscribe((resp:any) =>{
      this.ListTipoCuenta = resp.obsjeto;
    });
    this.http.ConsultarConsultarTipoMovimiento().subscribe((resp:any) =>{
      this.ListTipoMovimiento = resp.obsjeto;
    });
    this.http.ConsultarConsultarCiudad().subscribe((resp:any) =>{
      this.ListCiudad = resp.obsjeto;
    });
  }

  obtenerNombreTCliente(id: number): string {
    let objetoEncontrado = this.ListTipoCLiente.find(objeto => objeto.id === id);

    // Verificar si se encontró el objeto
    if (objetoEncontrado) {
      return objetoEncontrado.tipoCliente1;
    } else {
      return 'No encontrado';
    }
  }
  obtenerNombreTCuenta(id: number): string {
    for (let i = 0; i < this.ListTipoCuenta.length; i++) {
      if (this.ListTipoCuenta[i].idTc === id) {
        return this.ListTipoCuenta[i].tipoCuentaN;
      }
    }
  
    return 'No encontrado';
  }
  obtenerNombreCiudad(id: number): string {
    let objetoEncontrado = this.ListCiudad.find(objeto => objeto.id === id);

    // Verificar si se encontró el objeto
    if (objetoEncontrado) {
      return objetoEncontrado.nombreCiudad;
    } else {
      return 'No encontrado';
    }
  }
  obtenerNombreMovimiento(id: number): string {
    const objetoEncontrado = this.ListTipoMovimiento.find(objeto => objeto.id === id);

    // Verificar si se encontró el objeto
    if (objetoEncontrado) {
      return objetoEncontrado.nombreMovimiento;
    } else {
      return 'No encontrado';
    }
  }

  obtenerNombreNumeroCuenta(id: number): string {
    for (const cliente of this.ListaClienteDetalle) {
      const cuentaEncontrada = cliente.cuenta.find(cuenta => cuenta.id === id);
      // Si se encuentra la cuenta, devolver el número de cuenta
      if (cuentaEncontrada) {
        return cuentaEncontrada.numeroCuenta;
      }
    }
    return 'No encontrado';
  }

  GenerarExcel(){
    this.http.GenerarExcelI().subscribe((resp:any)=>{
      this.DescargarArchivo(resp.obsjeto, 'ReporteMovimientos.xlsx');
    })
  }
  GenerarExcelI(){
    this.http.GenerarExcelII().subscribe((resp:any)=>{
      this.DescargarArchivo(resp.obsjeto, 'ReporteFueraDeLaCiudad.xlsx');
    })
  }

  DescargarArchivo(linkSource:string, NombreArchivo:string): void {
    const downloadLink = document.createElement('a');
    const fileName = NombreArchivo;

    downloadLink.href = 'data:application/octet-stream;base64,'+linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  CrearTransaccion(){

    let Ncuenta = this.FormRegisterTrans.controls['numeroCuenta'].value;
    let Monto = this.formatNumber(this.FormRegisterTrans.controls['monto'].value);
    let TipoM = this.FormRegisterTrans.controls['TipoMovimiento'].value;
    let IdCiudad = this.FormRegisterTrans.controls['idCiudad'].value;

    this.http.CrearMovimiento(Ncuenta, Monto, TipoM, IdCiudad).subscribe((resp:any)=>{
      this.FormRegisterTrans.reset();
      this.consultarDetalleCliente();
      this.router.navigate(['/'], { fragment: 'Clientes' });
    });
  }

  CrearCliente(){

    let TipoCuenta: any;
    if(this.FormRegisterI.controls['idTipoCliente'].value == 1){
      TipoCuenta = 1
    }else{
      TipoCuenta = 2
    }


    let data = {
      "pnombre": this.FormRegister.controls['pnombre'].value,
      "snombre": this.FormRegister.controls['snombre'].value,
      "papellido": this.FormRegister.controls['papellido'].value,
      "sapellido": this.FormRegister.controls['sapellido'].value,
      "fechaNacimiento": this.FormRegisterI.controls['fechaNacimiento'].value,
      "idTipoCliente": this.FormRegisterI.controls['idTipoCliente'].value,
      "numeroIdentificador": this.FormRegisterI.controls['numeroIdentificador'].value,
      "numeroCuenta": this.FormRegisterI.controls['numeroCuenta'].value,
      "saldoCuenta": this.FormRegisterII.controls['saldoCuenta'].value,
      "idCiudad": this.FormRegisterII.controls['idCiudad'].value,
      "fechaCreacion": "2024-10-10",
      "idTipoCuenta": TipoCuenta
    }

    this.http.CrearCliente(data).subscribe((resp:any) =>{
      this.FormRegister.reset();
      this.FormRegisterI.reset();
      this.FormRegisterII.reset();
      this.consultarDetalleCliente();
      this.router.navigateByUrl("/#Clientes");
    });
  }
  getPages(): number[] {
    const pageCount = Math.ceil(this.ListaClienteDetalle.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
  
  formatCurrency(event: any) {
    let inputValue: string = event.target.value;
    const num = inputValue.replace(/[^\d.]/g, "");
    const parts = num.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedValue = parts.join('.');
    this.FormRegisterTrans.controls['monto']?.setValue(formattedValue, { emitEvent: false });
  }
  formatNumber(valor:string):number{
    const valorSinComasDecimal = valor.replace(/,/g, '');
    const valorDecimalParseado = parseFloat(valorSinComasDecimal);
    return valorDecimalParseado;
  }

}
