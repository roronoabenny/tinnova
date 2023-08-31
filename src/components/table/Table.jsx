import { Component } from "react";
import useFetch from "use-http";
import Modal from "../Modal/Modal";

function FetchUserData() {
  const endpoint = "https://private-9d65b3-tinnova.apiary-mock.com/users";

  const options = {};
  const { loading, error, data = [] } = useFetch(endpoint, options, []);
  // console.log(data);
  localStorage.setItem("users", JSON.stringify(data));
}

const GetUserData = () => {
  // FetchUserData()
  const storageData = JSON.parse(localStorage.getItem("users"));
  storageData.map((user) => console.log(user));
  return (
    <>
      {storageData.map((user) => (
        <tr key={user.cpf}>
          <td key="1" className="border-t-2 border-gray-200 px-4 py-3">
            {user.name}
          </td>
          <td key="2" className="border-t-2 border-gray-200 px-4 py-3">
            {user.cpf}
          </td>
          <td key="3" className="border-t-2 border-gray-200 px-4 py-3">
            {user.phone}
          </td>
          <td key="4" className="border-t-2 border-gray-200 px-4 py-3">
            {user.email}
          </td>
        </tr>
      ))}
    </>
  );
};

class Table extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <section className="text-gray-600 body-font">
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>Modal</p>
        </Modal>
        <div className="container px-5 py-24 mx-auto">
          <div className="md flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
            <button
              onClick={this.showModal}
              className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
            >
              Adicionar Usuário
            </button>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Nome
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    CPF
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Phone
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Email
                  </th>
                  <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                </tr>
              </thead>
              <tbody>
                <GetUserData />
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
}

export default Table;