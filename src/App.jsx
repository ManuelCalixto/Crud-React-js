import React, { Component } from 'react';
import './CrudComponent.css'; // Importa el archivo CSS donde se definirán los estilos

class CrudComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: '',
        key: ''
      },
      editingKey: null,
      editedName: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
  }

  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now()
      }
    });
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== '') {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: {
          text: '',
          key: ''
        }
      });
    }
  }

  deleteItem(key) {
    const filteredItems = this.state.items.filter(item => item.key !== key);
    this.setState({
      items: filteredItems
    });
  }

  handleEdit(key, text) {
    this.setState({
      editingKey: key,
      editedName: text
    });
  }

  handleEditChange(e) {
    this.setState({ editedName: e.target.value });
  }

  handleSave(key) {
    const { items, editedName } = this.state;
    const updatedItems = items.map(item => {
      if (item.key === key) {
        return { ...item, text: editedName };
      }
      return item;
    });
    this.setState({
      items: updatedItems,
      editingKey: null,
      editedName: ''
    });
  }

  handleCancelEdit() {
    this.setState({
      editingKey: null,
      editedName: ''
    });
  }

  render() {
    const { items, editingKey, editedName } = this.state;
    return (
      <div className="crud-container">
        <form onSubmit={this.addItem} className="form">
          <h1 className="crud-titulo">Escribe nombre</h1>
          <input
            type="text"
            placeholder="Manuel Garcia"
            value={this.state.currentItem.text}
            onChange={this.handleInput}
            className="input-field"
          />
          <button type="submit" className="add-button">Add</button>
        </form>
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.key} className={editingKey === item.key ? "editing" : ""}>
                  <td>
                    {editingKey === item.key ? (
                      <input
                        type="text"
                        value={editedName}
                        onChange={this.handleEditChange}
                        className="edit-input"
                      />
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </td>
                  <td className="action-buttons">
                    {editingKey === item.key ? (
                      <div>
                        <button
                          className="save-button"
                          onClick={() => this.handleSave(item.key)}
                        >
                          Guardar
                        </button>
                        <button
                          className="cancel-button"
                          onClick={this.handleCancelEdit}
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="edit-button"
                          onClick={() => this.handleEdit(item.key, item.text)}
                        >
                          Editar
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => this.deleteItem(item.key)}
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h5 className='mi-nombre'>
                      Jose Manuel Garcia Calixto
          </h5>
        </div>
      </div>
    );
  }
}

export default CrudComponent;
