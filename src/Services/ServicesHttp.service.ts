import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServicesHttpService {

private url = environment.apiUrl;

constructor(private http:HttpClient) { }

ConsultarCLienteDetalle():any{
  return this.http.get<any>(this.url+"Cuenta/ConsultarClienteYcuentas");
}

//LlavesForaneas
ConsultarTipoCliente():any{
  return this.http.get<any>(this.url+"LlavesForaneas/ConsultarTipoCLiente");
}
ConsultarTipoCuenta():any{
  return this.http.get<any>(this.url+"LlavesForaneas/ConsultarTipoCuenta");
}
ConsultarConsultarCiudad():any{
  return this.http.get<any>(this.url+"LlavesForaneas/ConsultarCiudad");
}
ConsultarConsultarTipoMovimiento():any{
  return this.http.get<any>(this.url+"LlavesForaneas/ConsultarTipoMovimiento");
}
GenerarExcelI():any{
  return this.http.get<any>(this.url+"GenerarExcel/ClientesConTransaccionesEnMes?mes=01&anio=2024");
}
GenerarExcelII():any{
  return this.http.get<any>(this.url+"GenerarExcel/ClientesenCiudadDiferente");
}

CrearMovimiento(ncuenta:number, monto:number, TipoTranscacion:number, idCiudad:number):any{
  return this.http.post(this.url+`Cuenta/ConsigarYretirar?NumeroCuenta=${ncuenta}&Monto=${monto}&TipoTranscacion=${TipoTranscacion}&IdCiudad=${idCiudad}`, null);
}

CrearCliente(data:any):any{
  return this.http.post(this.url+"Cuenta/RegistrarCuentaYcliente", data);
}

}
