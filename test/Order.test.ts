import Coupon from "../src/Coupon";
import Item from "../src/Item";
import Order from "../src/Order";

test("Não deve criar um pedido com CPF inválido", function () {
  expect(() => new Order("111.111.111-11")).toThrow(new Error("Cpf inválido"));
});

test("Deve criar um pedido sem itens", function () {
  const order = new Order("402.636.770-36");
  const total = order.getTotal();
  expect(total).toBe(0)
})

test("Deve criar um pedido com 3 itens", function () {
  const order = new Order("402.636.770-36");
  order.addItem(new Item(1, "Guitarra", 1000), 1);
  order.addItem(new Item(2, "Amplificador", 5000), 1);
  order.addItem(new Item(3, "Cabo", 30), 3);
  const total = order.getTotal();
  expect(total).toBe(6090)
})

test("Deve criar um pedido com 3 itens com cupom de desconto", function () {
  const order = new Order("402.636.770-36");
  order.addItem(new Item(1, "Guitarra", 1000), 1);
  order.addItem(new Item(2, "Amplificador", 5000), 1);
  order.addItem(new Item(3, "Cabo", 30), 3);
  order.addCoupon(new Coupon("VALE20", 20, new Date(new Date().getTime() + (1*24*60*60*1000))));
  const total = order.getTotal();
  expect(total).toBe(4872);
})

test("Não deve aplicar cupom expirado no pedido", function() {
  const order = new Order("402.636.770-36");
  order.addItem(new Item(1, "Guitarra", 1000), 1);
  order.addItem(new Item(2, "Amplificador", 5000), 1);
  order.addItem(new Item(3, "Cabo", 30), 3);
  order.addCoupon(new Coupon("VALE20", 20, new Date(2020, 0, 12)));
  const total = order.getTotal();
  expect(total).toBe(6090);
})

test("Não deve ter item com quantidade negativa no pedido", function() {
  const order = new Order("402.636.770-36");
  expect(() => order.addItem(new Item(1, "Guitarra", 1000), -1)).toThrow(new Error("Quantidade inválida"));
})

test("Deve criar um pedido sem repetir itens", function () {
  const order = new Order("402.636.770-36");
  order.addItem(new Item(1, "Guitarra", 1000), 1);
  order.addItem(new Item(2, "Amplificador", 5000), 1);
  order.addItem(new Item(2, "Amplificador", 5000), 1);
  order.addItem(new Item(3, "Cabo", 30), 3);
  const total = order.getTotal();
  expect(total).toBe(6090)
})