export class Usuario {
    nombre:string;
    rol:string;
    usuario:string;
    contraseña:string;

    constructor(nombre:string, rol:string, usuario:string, contraseña:string){
        this.nombre = nombre;
        this.rol = rol;
        this.usuario = usuario;
        this.contraseña = contraseña;
    }

    set Nombre(nombre:string){
        this.nombre = nombre;
    }

    get Nombre():string{
        return this.nombre;
    }

    set Rol(rol:string){
        this.rol = rol;
    }

    get Rol():string{
        return this.rol;
    }

    set Usuario(usuario:string){
        this.usuario = usuario;
    }

    get Usuario():string{
        return this.usuario;
    }

    set Contraseña(contraseña:string){
        this.contraseña = contraseña;
    }

    get Contraseña():string{
        return this.contraseña;
    }
}
