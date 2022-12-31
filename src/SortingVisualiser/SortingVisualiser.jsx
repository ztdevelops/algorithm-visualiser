import React from "react";
import './SortingVisualiser.css'
import { getMergeSortAnimations } from "../SortingAlgorithms/SortingAlgorithms";

export class SortingVisualiser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        }
    }

    // Is called when component loads
    componentDidMount() {
        this.generateNewArray();
    }

    // Creates an array and pushes 100 random values
    generateNewArray() {
        let array = [];
        for (let i = 0; i < 300; i++) {
            let randomNum = generateRandomInt(10, 500);
            array.push(randomNum);
        }
        this.setState({ array });
        Array.from(document.getElementsByClassName('array-bar')).forEach((bar) => {
            bar.style.backgroundColor = 'darkgreen';
        })
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const change = i % 3 !== 2;
            const [leftIdx, rightIdx] = animations[i];
            const leftStyle = arrayBars[leftIdx].style;
            if (change) {
                const rightStyle = arrayBars[rightIdx].style;
                const color = i % 3 === 0 ? 'red' : 'greenyellow';
                setTimeout(() => {
                    leftStyle.backgroundColor = color;
                    rightStyle.backgroundColor = color;
                }, i * 2);
            } else {
                setTimeout(() => {
                    // rightIdx represents height when i % 3 == 2
                    leftStyle.height = `${rightIdx}px`;
                }, i * 2);
            }
        }
    }

    render() {
        const { array } = this.state;

        return (
            <>
                <div>
                    <div className="array-container">
                        {array.map((value, id) => (
                            <div className="array-bar" key={id} style={{ height: `${value}px` }}>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => this.generateNewArray()}>Generate a new array!</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                </div>
            </>
        )
    }
}

function generateRandomInt(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

export default SortingVisualiser;