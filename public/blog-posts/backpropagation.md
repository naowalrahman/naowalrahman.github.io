# Understanding Backpropagation

Recently, I built my [own neural network](https://github.com/naowalrahman/neural-network) from scratch in C++, and went through the ordeal of learning how gradient descent and backpropagation work. So, I thought sharing my own explanation could help solidify both my understanding and that of any readers. Here goes!

Somewhat unintuitively, backpropagation has 2 steps: forward propagation and backward propagation. We first propagate the input forward through the network to get the activations at each layer. Then, we calculate the error at the output layer and propagate that error "backward" through the layers to calculate gradients for the loss function. I'll explain what all of this means below.

## Forward Propagation

Consider all of the inputs $\mathbf{X}$ as a $n \times 1$ matrix, where n is the number of inputs. Then, for each hidden layer from $1 \dots L$ we have a weight matrix $\mathbf{W}^l$ and a bias vector $\mathbf{b}^l$. Each value $\mathbf{W}^l_{ij}$ represents the weight of the connection between the $i$-th neuron in layer $l$ and the the $j$-th layer in later $l - 1$. Similarly, each value $\mathbf{b}^l_i$ represents the bias term of the $i$-th neuron. All in all, we can represent each activation $\mathbf{a}^l$ recursively like this:

$$ z^l = \mathbf{W}^l \mathbf{a}^{l-1} + \mathbf{b}^l $$

$$ \mathbf{a}^l = \sigma(\mathbf{z}^l) $$

where $\sigma$ is the activation function for the layer $l$. Note that $\mathbf{a}^0 = \mathbf{X}$.

By starting from the input layer and propagating to layer $L$, we arrive at $\mathbf{a}^L = \sigma(\mathbf{z}^l)$.

## Backward Propagation

Now that we've found the output, we should calculate the loss (or cost), measuring the difference between the predicted output with our current weights and biases and the expected output. We measure this with a loss function $\mathcal{L}$:

$$\mathcal{L}(\mathbf{y}, \hat{\mathbf{y}}) = \frac{1}{n}\sum_{i=1}^{m}{\mathcal{L}(\mathbf{y}_i,\mathbf{\hat{y}}_i)}$$

Now, this is a good time to reinstate our goals: we want to find the gradient of the loss function $\partial \mathcal{L} / \partial \mathcal{\mathbf{W}^l}$ for each layer $l$ so that we can nudge the current values in a way that decreases the error. This is because the gradient always points in the [direction of greatest change](https://activecalculus.org/multi/S-10-6-Directional-Derivative.html), so by moving in the opposite direction of the gradient of $\mathcal{L}$ we slowly minimize it.

The naive way to calculate such a gradient is by actually taking each $\partial \mathcal{L} / \partial \mathcal{\mathbf{W}_{ij}^l}, \forall i \in \{1, 2, \dots, n\}, \forall j \in \{1, 2, \dots, m\}$ for a layer with $m$ inputs and $n$ inputs. However, this is impractical. To do this, we'd need to have training data containing not only input and expected final output but also expected hidden layer outputs. This would make training data neural network specific, meaning one set of training data cannot be used on a slightly altered model. Instead, we can use the multivariate chain rule, which allows us to account for the dependencies between layers:

$$\frac{\partial \mathcal{L}}{\partial \mathcal{\mathbf{W}^l}} = \frac{\partial \mathcal{L}}{\partial \mathcal{\mathbf{a}^l}} \cdot \frac{\partial \mathcal{\mathbf{a}^l}}{\partial \mathcal{\mathbf{z}^l}} \cdot \frac{\partial \mathcal{\mathbf{z}^l}}{\partial \mathcal{\mathbf{W}^l}}$$

$$\mathbf{z}^{l+1} = \mathbf{W}^{l+1} \mathbf{a}^l + \mathbf{b}^{l+1}$$

$$\delta^l \coloneqq \frac{\partial \mathcal{L}}{\partial \mathcal{\mathbf{a}^l}} \cdot \frac{\partial \mathcal{\mathbf{a}^l}}{\partial \mathcal{\mathbf{z}^l}} = \left( \frac{\partial \mathcal{L}}{\partial \mathcal{\mathbf{z}^{l+1}}} \cdot \frac{\partial \mathcal{\mathbf{z}^{l+1}}}{\partial \mathcal{\mathbf{a}^l}} \right) \cdot \frac{\partial \mathcal{\mathbf{a}^l}}{\partial \mathcal{\mathbf{z}^l}} = \boxed{ ( \delta^{l+1} \left(\mathbf{W}^{l+1})^T \right) \cdot \frac{\partial \mathcal{\mathbf{a}^l}}{\partial \mathcal{\mathbf{z}^l}} }$$

$$\mathbf{z}^l = \mathbf{W}^l \mathbf{a}^{l-1} + \mathbf{b}^l$$

$$\frac{\partial \mathcal{L}}{\partial \mathcal{\mathbf{W}^l}} = \delta^l \cdot \frac{\partial \mathcal{\mathbf{z}^l}}{\partial \mathcal{\mathbf{W}^l}} = \boxed{ \delta^l (\mathbf{a}^{l-1})^T }$$

Thus, we can recursively calculate $\delta^l$ and hence $\partial \mathcal{L} / \partial \mathcal{\mathbf{W}^l}$ for each layer. For the neural network described above, this takes $\mathcal{O}(n^2)$ derivatives for the output layer and depends on the training data only having the predicted result (therefore allowing us to generalize training data to any neural network).

To fully train our neural network, we can simply forward propagate and back propagate on every piece of training data. This method of training a neural network is called stochastic gradient descent.
