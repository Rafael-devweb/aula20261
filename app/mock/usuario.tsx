import { Usuario } from "../context/AuthContext";

export class UsuarioMock {

    private static usuarioDB: Usuario[] = [
        new Usuario(1, "Professor Samuel Matos", "00000000000", true),
        new Usuario(2, "Matheus", "00000000000", true),
        new Usuario(3, "Carlos", "00000000000", true),
        new Usuario(4, "joze", "00000000000", true),
        new Usuario(5, "Paulo", "00000000000", true)
    ];

    static async listarTodos(): Promise<Usuario[]> {
        return [...this.usuarioDB]
    }

    static async salvar(usuario: Usuario): Promise<void> {


        const indexExistente = this.usuarioDB.findIndex(u => u.codigo === usuario.codigo);

        if (indexExistente === -1) {

            const novoCodigo = Math.max(...this.usuarioDB.map(u => u.codigo)) + 1;
            usuario.codigo = novoCodigo;
            this.usuarioDB.push(usuario);
            console.log(`Usuario de ID ${novoCodigo} salvo com sucesso!`);

        }else{
            this.usuarioDB[indexExistente].nome = usuario.nome;
            this.usuarioDB[indexExistente].cpf = usuario.cpf;

            console.log(`Usuario de ID ${usuario.codigo} atualizado com sucesso!`);
        }
    }

    static async buscarPorId(codigo: Number): Promise<Usuario | undefined> {

        return this.usuarioDB.find(u => u.codigo === codigo);
    }
}