import './App.css'
import { Component } from 'react'
import { CatList } from './components/CatList'

export class App extends Component<
  React.ComponentPropsWithoutRef<'div'>,
  { error: boolean }
> {
  constructor(props: React.ComponentPropsWithoutRef<'div'>) {
    super(props)
    this.state = {
      error: false,
    }
  }

  render() {
    const { error } = this.state
    if (error) {
      throw new Error('БУММММММММММММММ')
    }
    return (
      <div className="App">
        <button
          onClick={() => this.setState({ error: true })}
          className="gradient-button "
        >
          Сделать некрасиво
        </button>{' '}
        <CatList />
      </div>
    )
  }
}
