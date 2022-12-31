import React from "react";
import './styles.css'
import { getMergeSortAnimations, getQuickSortAnimations } from "./animations";

const ARR_SIZE          = 200;
const DEFAULT_COLOUR    = 'darkgreen';
const PRIMARY_COLOUR    = 'greenyellow';
const SECONDARY_COLOUR  = 'red';
const TIMEOUT_DURATION  = 5;

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
        for (let i = 0; i < ARR_SIZE; i++) {
            let randomNum = generateRandomInt(10, 500);
            array.push(randomNum);
        }
        this.setState({ array });
        Array.from(document.getElementsByClassName('array-bar')).forEach((bar) => {
            bar.style.backgroundColor = DEFAULT_COLOUR;
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
                const color = i % 3 === 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
                setTimeout(() => {
                    leftStyle.backgroundColor = color;
                    rightStyle.backgroundColor = color;
                }, i * TIMEOUT_DURATION);
            } else {
                setTimeout(() => {
                    // rightIdx represents height when i % 3 == 2
                    leftStyle.height = `${rightIdx}px`;
                }, i * TIMEOUT_DURATION);
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
                    pivotStyle.backgroundColor = 'purple';
                    leftStyle.backgroundColor = operation === 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
                    rightStyle.backgroundColor = operation === 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
                }, i * TIMEOUT_DURATION);
            }
            else if (operation === 1) {
                // Swapping values
                setTimeout(() => {
                    const rightStyle = arrayBars[right].style;
                    const leftHeight = leftStyle.height;
                    const rightHeight = rightStyle.height;
                    leftStyle.height = rightHeight;
                    rightStyle.height = leftHeight;
                }, i * TIMEOUT_DURATION);

            } else {
                // Swapping pivot with right + 1
                setTimeout(() => {
                    const pivotHeight = pivotStyle.height;
                    const leftHeight = leftStyle.height;
                    pivotStyle.height = leftHeight;
                    leftStyle.height = pivotHeight;
                    leftStyle.backgroundColor = PRIMARY_COLOUR;
                    pivotStyle.backgroundColor = PRIMARY_COLOUR;
                }, i * TIMEOUT_DURATION);
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