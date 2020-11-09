from tensorflow.keras.models import load_model
import numpy as np
SPLIT = .1
EPOCHS = 200
BATCH_SIZE = 256
CHARS = [str(n) for n in range(10)] + [ '+' , ' ' , '\0' ]
CHAR_TO_INDEX = {i: c for c, i in enumerate(CHARS)}
INDEX_TO_CHAR = {c: i for c, i in enumerate(CHARS)}
DECIMALS = 0
N_OPERATIONS = 1
MAX_NUMBER = 1000
MIN_NUMBER = 0
MAX_N_EXAMPLES = (MAX_NUMBER - MIN_NUMBER) ** 2
N_EXAMPLES = int(round(MAX_N_EXAMPLES / 16.))
N_FEATURES = len(CHARS)
MAX_NUMBER_LENGTH_LEFT_SIDE = (
    max(len(str(MAX_NUMBER)), len(str(MIN_NUMBER))) +
    (DECIMALS + 1 if DECIMALS else 0)
)
MAX_NUMBER_LENGTH_RIGHT_SIDE = (
    MAX_NUMBER_LENGTH_LEFT_SIDE * (N_OPERATIONS + 1) + 1 +
    (DECIMALS + 1 if DECIMALS else 0)
)
MAX_EQUATION_LENGTH = (MAX_NUMBER_LENGTH_LEFT_SIDE + 2) * (1 + N_OPERATIONS)
MAX_RESULT_LENGTH = MAX_NUMBER_LENGTH_RIGHT_SIDE


def one_hot_to_index(vector):
    if not np.any(vector):
        return -1

    return np.argmax(vector)

def one_hot_to_char(vector):
    index = one_hot_to_index(vector)
    if index == -1:
        return ''

    return INDEX_TO_CHAR[index]

def one_hot_to_string(matrix):
    return ''.join(one_hot_to_char(vector) for vector in matrix)


def predict(model, equation):
    """
    Given a model and an equation string, returns the predicted result.
    """
    x = np.zeros((1, MAX_EQUATION_LENGTH, N_FEATURES), dtype=np.bool)
    equation += '\0'

    for t, char in enumerate(equation):
        x[0, t, CHAR_TO_INDEX[char]] = 1

    predictions = model.predict(x)
    return one_hot_to_string(predictions[0])[:-1]
    
model = load_model("/home/rd/Documents/Projects/lstm-math/lstm-math-master/model1.h5")  
print("The desired result is - ", predict(model, '10 * 20'))
