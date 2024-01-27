var Mediator = {
  instance: function () {
    if (!Mediator.instance) {
      Mediator.instance = this;
    }
    return Mediator.instance;
  },

  initTable: {},
  initCreateContact: {},
  initCreatePhone: {},
  PhoneNumber: {},
  initEditContact: {},
  


  async notify(sender, event) {
    switch (event) {
      case "initTable":
        this.initTable = sender
        break
      
      case "initCreateContact": 
        this.initCreateContact = sender;
        break
      
      case "reloadScreen":
        this.initTable.loadContacts();
      break

      case "initCreatePhone":
        this.initCreatePhone = sender;
        break

      case "AddPhone":
        this.PhoneNumber = sender
        await Mediator.initTable.AddPhone(this.PhoneNumber)
        break;

      case "initEditContact":
        this.initEditContact = sender
        break;

      case "EditContact":
        await this.initTable.EditContacts(sender);
        break;

      case "EditPhone":
        await this.initTable.EditPhone(sender);
        break;
      
      case "DeleteContact":
        await this.initTable.DeleteContact();
        break;

      case "DeletePhone":
        await this.initTable.DeletePhone();
        break;

    }

  }

}

export default Mediator