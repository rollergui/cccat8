import Coupon from "../../src/domain/entity/Coupon";
import Dimension from "../../src/domain/entity/Dimension";
import Item from "../../src/domain/entity/Item";
import Order from "../../src/domain/entity/Order";

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
  order.addCoupon(new Coupon("VALE20", 20));
  const total = order.getTotal();
  expect(total).toBe(4872);
})

test("Deve criar um pedido com 3 itens com cupom de desconto expirado", function() {
  const order = new Order("402.636.770-36", new Date(2021, 0, 12));
  order.addItem(new Item(1, "Guitarra", 1000), 1);
  order.addItem(new Item(2, "Amplificador", 5000), 1);
  order.addItem(new Item(3, "Cabo", 30), 3);
  order.addCoupon(new Coupon("VALE20", 20, new Date(2020, 0, 12)));
  const total = order.getTotal();
  expect(total).toBe(6090);
})

test("Deve criar um pedido com 3 itens com cupom de desconto válido", function () {
  const order = new Order("402.636.770-36");
  order.addItem(new Item(1, "Guitarra", 1000), 1);
  order.addItem(new Item(2, "Amplificador", 5000), 1);
  order.addItem(new Item(3, "Cabo", 30), 3);
  order.addCoupon(new Coupon("VALE20", 20, new Date(new Date().getTime() + (1*24*60*60*1000))));
  const total = order.getTotal();
  expect(total).toBe(4872);
})

test("Não deve adicionar itens duplicados no pedido", function() {
  const order = new Order("402.636.770-36");
  order.addItem(new Item(1, "Guitarra", 1000), 1)
  expect(() => order.addItem(new Item(1, "Guitarra", 1000), 1)).toThrow(new Error("Duplicated item"));
})

test("Deve criar um pedido com frete", function () {
  const order = new Order("402.636.770-36");
  order.addItem(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)), 1);
  const total = order.getTotal();
  expect(total).toBe(1030)
});

test("Deve criar um pedido com código", function () {
  const order = new Order("402.636.770-36", new Date("2022-03-01T10:00:00"), 1);
  order.addItem(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)), 1);
  expect(order.getCode()).toBe("202200000001")
});