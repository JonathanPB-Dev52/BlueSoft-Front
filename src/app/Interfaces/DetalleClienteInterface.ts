export interface ClienteDetalle {
    id: number
    pnombre: string
    snombre: string
    papellido: string
    sapellido: string
    fechaNacimiento: string
    idTipoCliente: number
    numeroIdentificador: string
    cuenta: Cuenta[]
    movimiento: Movimiento[]
  }
  
  export interface Cuenta {
    id: number
    numeroCuenta: string
    saldoCuenta: string
    idCiudad: number
    fechaCreacion: string
    idTipoCuenta: number
  }
  
  export interface Movimiento {
    id: number
    idMovimiento: number
    idCuenta: number
    monto: string
    idCiudad: number
    fechaMovimiento: string
  }