const { work } = require("./unitOfWork");

test("Getting the unit of work", async () => {
  const auth = { test: "test" };
  const res = await work(auth, async (db) => {
    expect(db).toBeDefined();
    return "working";
  });
  expect(res).toBe("working");
});
