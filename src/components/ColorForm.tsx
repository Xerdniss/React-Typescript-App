import React, { FormEvent, ChangeEvent, Component } from "react";
import { Color } from "./types";

type ColorFormState = {
  name: string;
  value: string;
};

type StateUpdater = Pick<ColorFormState, "name" | "value">;

type ColorFormProps = {
  onColorAdd: (color: Color) => void;
};

class ColorForm extends Component<ColorFormProps, ColorFormState> {
  state = {
    name: "",
    value: "",
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.name]: event.target.value,
    } as StateUpdater);
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { name, value } = this.state;

    const colorRegex = /^#[0-9a-f]{6}$/i;
    if (!colorRegex.test(value)) {
      return;
    }

    const hexValues = value.match(/[0-9a-f]{2}/gi) || [];
    const [r, g, b] = hexValues.map((hex) => parseInt(hex, 16));
    const color = { name, value, r, g, b, s: 100 };
    const colors = JSON.parse(localStorage.getItem("colors") || "[]");
    localStorage.setItem("colors", JSON.stringify([...colors, color]));

    console.log(JSON.parse(localStorage.getItem("colors") || "[]"));

    this.props.onColorAdd(color);

    this.setState({ name: "", value: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            name="name"
            data-name="newinputfirst"
            placeholder="Nazwa"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            name="value"
            placeholder="Wartość"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <button type="submit">Dodaj kolor</button>
      </form>
    );
  }
}

export default ColorForm;
