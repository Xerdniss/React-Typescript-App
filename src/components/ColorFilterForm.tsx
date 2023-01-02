import React, { FormEvent, ChangeEvent, Component } from "react";
import { Color } from "./types";

type ColorFilterState = {
  r: number;
  g: number;
  b: number;
  s: number;
};

type StateUpdater = Pick<ColorFilterState, "r" | "g" | "b" | "s">;

type ColorFilterProps = {
  colors: Color[];
  onFilterChange: (filteredColors: Color[]) => void;
};

class ColorFilterForm extends Component<ColorFilterProps, ColorFilterState> {
  state = {
    r: 127,
    g: 127,
    b: 127,
    s: 50,
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.name]:
        event.target.type === "number"
          ? parseInt(event.target.value)
          : event.target.value,
    } as StateUpdater);
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { r, g, b, s } = this.state;
    const filteredColors = this.props.colors.filter((color) => {
      return color.r > r && color.g > g && color.b > b && color.s > s;
    });
    this.props.onFilterChange(filteredColors);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            title="Czerwony"
            type="number"
            name="r"
            data-name="red"
            value={this.state.r}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          <input
            title="Zielony"
            type="number"
            name="g"
            data-name="green"
            value={this.state.g}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          <input
            title="Niebieski"
            type="number"
            name="b"
            data-name="blue"
            value={this.state.b}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          <input
            title="Nasycenie"
            type="number"
            name="s"
            value={this.state.s}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <button type="submit">Filtruj kolory</button>
      </form>
    );
  }
}
export default ColorFilterForm;
