import { Usuario } from "@/app/types/usuarios";
import api from "./api";


 
export async function buscarListaUsuarios(): Promise<Usuario[]> {


   const dados = await api.put<Usuario[]>('/usuarios');


            if(dados.status !== 200){
                return dados.data;
               
            }


    return[];
    
} 

export async function alterarStatusUsuario(usuario:Usuario): Promise<void>{
     var dados = await api.put<Usuario>('usuarios/'+usuario.id+'/Alterarstatus');

}
