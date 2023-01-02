import React, { Component } from "react";

type Color = {
  name: string;
  value: string;
  r: number;
  g: number;
  b: number;
  s: number;
};

type ColorListProps = {
  colors: Color[];
  onDelete: (color: Color) => void;
};

type ColorListState = {};

const formatColorName = (color: Color) => {
  const { r, g, b } = color;
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
};

class ColorList extends Component<ColorListProps, ColorListState> {
  componentDidMount() {
    window.addEventListener("storage", this.handleStorageChange);
  }

  componentWillUnmount() {
    window.removeEventListener("storage", this.handleStorageChange);
  }

  handleStorageChange = (event: StorageEvent) => {
    if (event.key === "colors") {
      this.forceUpdate();
    }
  };
  render() {
    const sortedColors = this.props.colors.sort((a, b) => {
      if (a.r > b.r) {
        return -1;
      } else if (a.r < b.r) {
        return 1;
      } else {
        if (a.g > b.g) {
          return -1;
        } else if (a.g < b.g) {
          return 1;
        } else {
          if (a.b > b.b) {
            return -1;
          } else if (a.b < b.b) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    });
    return (
      <ul>
        <li><div
              data-name="rectangle"
              style={{
                backgroundColor: "#FF0000",
              }}
            ></div>Red #FF0000</li>
        <li><div
              data-name="rectangle"
              style={{
                backgroundColor: "#00FF00",
              }}
            ></div>Green #00FF00</li>
        <li><div
              data-name="rectangle"
              style={{
                backgroundColor: "#0000FF",
              }}
            ></div>Blue #0000FF</li>
        {sortedColors.map((color, index) => (
          <li key={color.value}>
            <div
              data-name="rectangle"
              style={{
                backgroundColor: color.value,
              }}
            ></div>
            <span>
              {color.name} - {formatColorName(color)}
            </span>
            <button data-name="deletebutton" onClick={() => this.props.onDelete(color)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }
}

export default ColorList;
