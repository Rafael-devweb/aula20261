package com.senac.aula012026.aula012026.domain.valueobject;

import com.senac.aula012026.aula012026.infra.ex.RegraNegocioException;
import jakarta.persistence.Embeddable;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
public class CNPJ {
    private String cnpj;

    public CNPJ(String cnpj) {
        if (cnpj == null) {
            throw new RegraNegocioException("CNPJ não pode ser nulo!");
        }
        String cleanValor = cnpj.replaceAll("[^0-9]", "");
        if (!isValid(cleanValor)) {
            throw new RegraNegocioException("CNPJ inválido!");
        }
        this.cnpj = cleanValor;
    }

    public String getValor() {
        return cnpj;
    }

    private boolean isValid(String cnpj) {
        if (cnpj.length() != 14 || cnpj.matches("^(\\d)\\1{13}$")) return false;

        return validarDigitosVerificadores(cnpj);
    }

    private boolean validarDigitosVerificadores(String cnpj) {
        int[] pesosDigito1 = {5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
        int[] pesosDigito2 = {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};

        int soma = 0;
        for (int i = 0; i < 12; i++) {
            int num = Character.getNumericValue(cnpj.charAt(i));
            soma += num * pesosDigito1[i];
        }

        int resto = soma % 11;
        int digito1 = (resto < 2) ? 0 : 11 - resto;

        soma = 0;
        for (int i = 0; i < 13; i++) {
            int num = Character.getNumericValue(cnpj.charAt(i));
            soma += num * pesosDigito2[i];
        }

        resto = soma % 11;
        int digito2 = (resto < 2) ? 0 : 11 - resto;

        int cnpjDigito1 = Character.getNumericValue(cnpj.charAt(12));
        int cnpjDigito2 = Character.getNumericValue(cnpj.charAt(13));

        return digito1 == cnpjDigito1 && digito2 == cnpjDigito2;
    }


    @Override
    public String toString() {
        return cnpj.replaceAll(
                "(\\d{2})(\\d{3})(\\d{3})(\\d{4})(\\d{2})",
                "$1.$2.$3/$4-$5"
        );
    }

}
