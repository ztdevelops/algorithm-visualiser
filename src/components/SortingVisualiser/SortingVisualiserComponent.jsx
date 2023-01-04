import React from "react";
import './SortingVisualiserStyles.css'
import { animateBubbleSort } from "../../algorithms/sort/bubbleSort";
import { animateHeapSort } from "../../algorithms/sort/heapSort";
import { animateInsertionSort } from "../../algorithms/sort/insertionSort";
import { animateMergeSort } from "../../algorithms/sort/mergeSort";
import { animateQuickSort } from "../../algorithms/sort/quickSort";

import { DEFAULT_COLOUR, ARR_SIZE, MAX_BAR_HEIGHT } from "../../utils/config";

// TODO: Convert to Functional Component
export class SortingVisualiserComponent extends React.Component {
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
            let randomNum = generateRandomInt(10, MAX_BAR_HEIGHT);
            array.push(randomNum);
        }
        this.setState({ array });
        Array.from(document.getElementsByClassName('array-bar')).forEach((bar) => {
            bar.style.backgroundColor = DEFAULT_COLOUR;
        })
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
                    <button className="custom-buttons sort" onClick={() => this.generateNewArray()}>Generate a new array!</button>
                    <hr></hr>
                    <button className="custom-buttons sort" onClick={() => animateBubbleSort(this.state.array)}>Bubble Sort</button>
                    <button className="custom-buttons sort" onClick={() => animateInsertionSort(this.state.array)}>Insertion Sort</button>
                    <button className="custom-buttons sort" onClick={() => animateMergeSort(this.state.array)}>Merge Sort</button>
                    <button className="custom-buttons sort" onClick={() => animateQuickSort(this.state.array)}>Quick Sort</button>
                    <button className="custom-buttons sort" onClick={() => animateHeapSort(this.state.array)}>Heap Sort</button>
                </div>
            </>
        )
    }
}

function generateRandomInt(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

export default SortingVisualiserComponent;
