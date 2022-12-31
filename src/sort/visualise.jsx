import React from "react";
import './styles.css'
import { getMergeSortAnimations, getQuickSortAnimations } from "./animations";

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
        for (let i = 0; i < 10; i++) {
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

    quickSort() {
        const animations = getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [operation, pivot, left, right] = animations[i];
            const pivotStyle = arrayBars[pivot].style;
            const leftStyle = arrayBars[left].style;

            if (operation === 0 || operation === 0.5) {
                // Checking values
                setTimeout(() => {
                    const rightStyle = arrayBars[right].style;
                    pivotStyle.backgroundColor = 'red';
                    leftStyle.backgroundColor = operation === 0 ? 'red' : 'greenyellow';
                    rightStyle.backgroundColor = operation === 0 ? 'red' : 'greenyellow';
                }, i * 200);
            }
            else if (operation === 1) {
                // Swapping values
                setTimeout(() => {
                    const rightStyle = arrayBars[right].style;
                    const leftHeight = leftStyle.height;
                    const rightHeight = rightStyle.height;
                    leftStyle.height = rightHeight;
                    rightStyle.height = leftHeight;
                }, i * 200);

            } else {
                // Swapping pivot with right + 1
                setTimeout(() => {
                    const pivotHeight = pivotStyle.height;
                    const leftHeight = leftStyle.height;
                    pivotStyle.height = leftHeight;
                    leftStyle.height = pivotHeight;
                    leftStyle.backgroundColor = 'greenyellow';
                    pivotStyle.backgroundColor = 'greenyellow';
                }, i*200);
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
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                </div>
            </>
        )
    }
}

function generateRandomInt(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

export default SortingVisualiser;