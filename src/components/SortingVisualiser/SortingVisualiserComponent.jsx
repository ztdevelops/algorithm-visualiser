import React from "react";
import './SortingVisualiserStyles.css'
import { animateBubbleSort } from "../../algorithms/sort/bubbleSort";
import { animateHeapSort } from "../../algorithms/sort/heapSort";
import { animateInsertionSort } from "../../algorithms/sort/insertionSort";
import { animateMergeSort } from "../../algorithms/sort/mergeSort";
import { animateQuickSort } from "../../algorithms/sort/quickSort";

import { DEFAULT_COLOUR, ARR_SIZE, MAX_BAR_HEIGHT, MAX_BAR_MULTIPLIER, ARRAY_CONTAINER_HEIGHT } from "../../utils/config";

import 'react-bootstrap/dist/react-bootstrap';
import { Button, Container } from 'react-bootstrap';

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
                <Container fluid>
                    <Container className="array-container" style={{height: `${ARRAY_CONTAINER_HEIGHT}vh`}}>
                        {array.map((value, id) => (
                            <div className="array-bar" key={id} style={{ height: `${value / MAX_BAR_HEIGHT * MAX_BAR_MULTIPLIER}vh` }}>
                            </div>
                        ))}
                    </Container>
                    <Container fluid>
                    <Button size="sm" className="sort" variant='dark' onClick={() => this.generateNewArray()}>Generate New Array!</Button>
                            <hr></hr>
                            <Button size="sm" className="sort" variant='dark' onClick={() => animateBubbleSort(this.state.array)}>Bubble Sort</Button>
                            <Button size="sm" className="sort" variant='dark' onClick={() => animateInsertionSort(this.state.array)}>Insertion Sort</Button>
                            <Button size="sm" className="sort" variant='dark' onClick={() => animateMergeSort(this.state.array)}>Merge Sort</Button>
                            <Button size="sm" className="sort" variant='dark' onClick={() => animateQuickSort(this.state.array)}>Quick Sort</Button>
                            <Button size="sm" className="sort" variant='dark' onClick={() => animateHeapSort(this.state.array)}>Heap Sort</Button>
                    </Container>

                </Container>
            </>
        )
    }
}

function generateRandomInt(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

export default SortingVisualiserComponent;
