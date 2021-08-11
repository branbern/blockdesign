import React from 'react';
import './Game.css';
import {getAllMaps, saveMap} from '../API/interface'
import ColorSketch from './ColorSketch'

const numOfCells = 492

class Game extends React.Component {

    constructor() {
        super();
        this.state = {
            cells: [],
            color: "grey",
            saves: [],
            displayColorPicker: false,
            showModal: false,
            mapName: ''
        }
    }

    componentDidMount() {
        this.loadAllMaps()
        this.makeBlankCells()
    }

    loadAllMaps() {
        getAllMaps().then((data) => {
            this.setState({saves: data.data.listMaps.items})
        })
    }

    makeBlankCells() {
        let cells = []
        for(let i = 0; i <= numOfCells; i++) {
            cells.push({color: 'black', id: i})
        }
        this.setState({cells: cells})
    }


    updateCells = (cells) => {
        this.setState({cells: cells})
    }

    updateCell = (id) => {
        let newCells = [...this.state.cells]
        newCells[id].color = this.state.color
        this.setState({cells: newCells})
    }

    loadSavedMap = (cells) => {
        this.setState({cells: cells})
    }
    handleSetColor = (color) => {
        this.setState({ color: color.hex })
    };
    submitModal = () => {
        saveMap(this.state.cells, this.state.mapName)

        let savesCopy = [...this.state.saves]
        savesCopy.push({name: this.state.mapName, seed: this.state.cells})

        this.setState({showModal: false, saves: savesCopy});
    }
    handleRandom = () => {
      
    }
    handleClear = () => {
        this.board = this.makeEmptyBoard();
        this.setState({ cells: this.makeCells() });
    }
    showModal = () => {
        this.setState({showModal: true});
    }
    render() {
        const { cells} = this.state;
        return (
            <div>
                <div>
                    <div className='Cells'>
                        {cells.map((cell, i) => (
                            <div className="Cell" key={i} onClick={() => this.updateCell(cell.id)} style={{background: cell.color}}/>
                        ))}
                    </div>
                    
                    <div className="controls">
                        <ColorSketch setColor={this.handleSetColor} color={this.state.color}/>
                        <button className="button" onClick={this.handleRandom}>Random</button>
                        <button className="button" onClick={this.handleClear}>Clear</button>
                        <button className="button" onClick={this.showModal}>Save</button>

                        <div id="myModal" className={this.state.showModal ? 'modal': 'hide modal'}>
                            <div className="modal-content">
                                <span className="close" onClick={() => this.setState({showModal: false})}>&times;</span>
                                <p>Looks great! Now choose a name to call this beautiful piece of art...</p>
                                <input type="text" id="input" name="map name" onChange={(e) => this.setState({mapName: e.target.value})}/>

                                <button onClick={this.submitModal}>finished!</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='Saves'>
                    {this.state.saves.map((save, i) => {
                        console.log(save)
                        return (<div className="map-save" key={i} onClick={() => this.loadSavedMap(save.seed)}>
                                    <p style={{width: 400, margin: 'auto', padding: 20}}><span>Creator: {save.createdBy}</span> <span style={{float: 'right'}}>Design Name: {save.name}</span></p>
                                    <div className='small-cells-wrapper'>
                                        {save.seed.map((cell, i) => (
                                            <div className="small-cell" key={i} onClick={() => this.updateCell(cell.id)} style={{background: cell.color}}/>
                                        ))}
                                    </div>
                                </div>)
                    })}
                </div>
               
            </div>
        );
    }
}


export default Game;