import React, { Component } from 'react';
import ColorList from './components/ColorList';
import ColorForm from './components/ColorForm';
import ColorFilterForm from './components/ColorFilterForm';
import './App.css'

type Color = {
  name: string;
  value: string;
  r: number;
  g: number;
  b: number;
  s: number;
};

type AppState = {
  colors: Color[];
  filteredColors: Color[];
};

class App extends Component<{}, AppState> {
  state = {
    colors: JSON.parse(localStorage.getItem('colors') || '[]'),
    filteredColors: JSON.parse(localStorage.getItem('colors') || '[]'),
  };

  componentDidMount() {
    const colors = JSON.parse(localStorage.getItem('colors') || '[]');
    this.setState({ colors, filteredColors: colors });
  };

  handleDelete = (color: Color) => {
    const colors = this.state.colors.filter((c: Color) => c.value !== color.value);
    localStorage.setItem('colors', JSON.stringify(colors));
    this.setState({ colors });
  };

  handleColorAdd = (color: Color) => {
    const { colors } = this.state;
    let index = 0;
    for (let i = 0; i < colors.length; i++) {
      if (colors[i].r > color.r || (colors[i].r === color.r && colors[i].g > color.g) || (colors[i].r === color.r && colors[i].g === color.g && colors[i].b > color.b)) {
        break;
      }
      index++;
    }

    this.setState((state) => ({
      colors: [...state.colors.slice(0, index), color, ...state.colors.slice(index)],
    }));
  };

  handleFilterChange = (filteredColors: Color[]) => {
    if (filteredColors.length > 0) {
      console.log(filteredColors);
      this.setState({ colors: filteredColors });
    } else {
      this.setState({ filteredColors: this.state.colors });
    }
  };
  render() {
    return (
      <div>
        <ColorForm onColorAdd={this.handleColorAdd} />
        <ColorFilterForm
          colors={this.state.colors}
          onFilterChange={this.handleFilterChange}
        />
        <ColorList colors={this.state.colors} onDelete={this.handleDelete} />
      </div>
    );
  }
}

export default App;