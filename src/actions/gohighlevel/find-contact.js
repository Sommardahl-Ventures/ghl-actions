const { findContact } = require("../../domain/contacts");
const { work } = require("../../data/unitOfWork");

module.exports = {
  name: "Find Contact",
  description: "Finds an contact by id, email address or name.",
  key: "find_contact",
  version: "9.9.9",
  type: "action",
  props: {
    gohighlevel: {
      type: "app",
      app: "gohighlevel",
    },
    searchKey: {
      type: "string",
      options: [
        { label: "ID", value: "id" },
        {
          label: "Email Address",
          value: "email",
        },
        { label: "Name", value: "name" },
      ],
    },
    searchValue: {
      type: "string",
      label: "Value to Search By",
    },
    noResults: {
      type: "string",
      label: "No Results Behavior",
      options: ["Return", "Fail", "Create"],
      default: "Return",
    },
  },
  async run() {
    return await work(this.gohighlevel.$auth, async (app) => {
      const res = await findContact(
        app,
        this.searchKey,
        this.searchValue,
        this.noResults === "Create"
      );
      if (this.noResults === "Fail" && res.length === 0) {
        console.log(this);
        throw new Error("No results returned.");
      }
      return res;
    });
  },
};
