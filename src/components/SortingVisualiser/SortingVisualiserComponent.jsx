import 'react-bootstrap/dist/react-bootstrap';
import { Button, Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from "react";

import './SortingVisualiserStyles.css'

import { animateBubbleSort } from "../../algorithms/sort/bubbleSort";
import { animateHeapSort } from "../../algorithms/sort/heapSort";
import { animateInsertionSort } from "../../algorithms/sort/insertionSort";
import { animateMergeSort } from "../../algorithms/sort/mergeSort";
import { animateQuickSort } from "../../algorithms/sort/quickSort";

import { DEFAULT_COLOUR, ARR_SIZE, MAX_BAR_HEIGHT, MAX_BAR_MULTIPLIER, ARRAY_CONTAINER_HEIGHT } from "../../utils/config";

const SortingVisualiserComponent = () => {
    const [array, setArray] = useState([]);

    // ComponentDidMount
    useEffect(() => {
        generateArray();
    }, []);

    useEffect(() => {
        Array.from(document.getElementsByClassName('array-bar')).forEach((bar) => {
            bar.style.backgroundColor = DEFAULT_COLOUR;

            document.getElementById("runtime").innerText = "";
            document.getElementById("sortType").innerText = "";
        })
    }, [array])

    const generateArray = () => {
        let generatedArray = [];
        for (let i = 0; i < ARR_SIZE; i++) {
            generatedArray.push(generateRandomInt(10, MAX_BAR_HEIGHT));
        }
        setArray(generatedArray);
    };

    return (
        <>
            <Container fluid>
                <Container style={{ marginTop: `20px` }}>Size of Array: <b>{ARR_SIZE}</b> elements.</Container>
                <Container className="array-container" style={{ height: `${ARRAY_CONTAINER_HEIGHT}vh` }}>
                    {array.map((value, id) => (
                        <div className="array-bar" key={id} style={{ height: `${value / MAX_BAR_HEIGHT * MAX_BAR_MULTIPLIER}vh` }}>
                        </div>
                    ))}
                </Container>
                <Container>
                    <Row className="align-items-center">
                        <Col >
                            <div id="runtime">
                            </div>
                        </Col>
                        <Col>
                            <Button size="sm" className="sort" variant='dark' onClick={() => generateArray()}>Generate New Array!</Button>
                        </Col>
                        <Col>
                            <div id="sortType">
                            </div>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Button size="sm" className="sort" variant='dark' onClick={() => animateBubbleSort(array)}>Bubble Sort</Button>
                    <Button size="sm" className="sort" variant='dark' onClick={() => animateInsertionSort(array)}>Insertion Sort</Button>
                    <Button size="sm" className="sort" variant='dark' onClick={() => animateMergeSort(array)}>Merge Sort</Button>
                    <Button size="sm" className="sort" variant='dark' onClick={() => animateQuickSort(array)}>Quick Sort</Button>
                    <Button size="sm" className="sort" variant='dark' onClick={() => animateHeapSort(array)}>Heap Sort</Button>
                </Container>
            </Container>
        </>
    );
}

const generateRandomInt = (mi, mx) => {
    return Math.floor(Math.random() * (mx - mi + 1) + mi);
}

export default SortingVisualiserComponent;