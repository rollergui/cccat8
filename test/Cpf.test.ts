import Cpf from "../src/Cpf";

test("Deve validar o cpf válido que tem digito != 0", function () {
  const cpf = new Cpf("402.636.770-36");
  expect(cpf).toBeDefined();
});

test("Deve validar o cpf com dígito zero no primeiro dígito", function () {
  const cpf = new Cpf("994.076.790-04");
  expect(cpf).toBeDefined();
});

test("Deve validar o cpf com dígito zero no último dígito", function () {
  const cpf = new Cpf("180.641.670-00");
  expect(cpf).toBeDefined();
});

test("Deve tentar validar o cpf com mais de 14 caracteres", function () {
  expect(() => new Cpf("180.641.670-000")).toThrow(new Error("Cpf inválido"));
});

test("Deve validar o cpf com dígitos iguais", function () {
  expect(() => new Cpf("111.111.111-11")).toThrow(new Error("Cpf inválido"));
});

test("Deve validar o cpf com letras", function () {
  expect(() => new Cpf("abxc")).toThrow(new Error("Cpf inválido"));
});