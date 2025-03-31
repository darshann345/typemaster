import React, { useState, useEffect } from "react";

const textToType = " A paragraph is a unit of writing in a larger body of work. It expresses a particular topic or theme. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose. The oldest classical Greek and Latin";

const App = () => {
    const [inputValue, setInputValue] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (inputValue.endsWith(' ')) {
            checkInput();
        }
    }, [inputValue]);

    const handleChange = (e) => {
        if (currentIndex < textToType.split(" ").length) {
            setInputValue(e.target.value);
            if (!isTyping) setIsTyping(true);
        }
    };

    const checkInput = () => {
        const currentText = textToType.split(" ")[currentIndex];

        if (inputValue.trim() === currentText) {
            setCurrentIndex(currentIndex + 1);
            setInputValue("");
        }

        // Prevent going out of bounds
        if (currentIndex + 1 >= textToType.split(" ").length) {
            setCurrentIndex(textToType.split(" ").length);
        }
    };

    const restartTest = () => {
        setInputValue("");
        setCurrentIndex(0);
        setIsTyping(false);
    };

    return (
        <div style={styles.container}>
            <h2>Typing Test</h2>
            <p style={styles.input}>
                {textToType.split(" ").map((word, index) => (
                    <span key={index} 
                    style={{ 
                        color: index < currentIndex ? "green" : index === currentIndex ? "yellow" : "white" 
                    }}>
                        {word + " "}
                    </span>
                ))}
            </p>
            <input 
                type="text"
                value={inputValue}
                onChange={handleChange}
                style={styles.textInput}
                disabled={currentIndex >= textToType.split(" ").length} 
            />
            <button onClick={restartTest} style={styles.button}>Restart Test</button>
            <p>{`${currentIndex}/${textToType.split(" ").length}`}</p>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#333',
        color: '#fff',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    prompt: {
        marginBottom: '20px'
    },
    input: {
        marginBottom: '20px'
    },
    textInput: {
        padding: '10px',
        fontSize: '18px',
        width: '300px',
        borderRadius: '5px',
        border: 'none'
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#555'
    }
};

export default App;