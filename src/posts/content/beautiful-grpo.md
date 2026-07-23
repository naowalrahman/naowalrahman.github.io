---
title: Why GRPO is Beautifully Simple
subtitle: The reward gradient is almost just cross entropy!
date: 2026-07-23
description: A breakdown of the GRPO reward gradient and showing how the derivation matches the loss you'd design by intuition.
draft: true
---

Unlike traditional machine learning models, LLMs have innate, mathematically chaotic randomness whose output is interpretable. For one, we have the model temperature, which controls the randomness and creativity of the generated text. At the same time, small differences in the input tokens can make the output radically different mathematically, even if the decoded text can be interpreted similarly.

As a result, reinforcement learning for LLMs can, with enough data and compute, shy away from proximal policy optimization, which requires updating actor and critic networks to evaluate an action's reward properly, and instead opt to exploit the randomness to formulate our reward.

If you've studied randomized algorithms before, you'll know that they frequently lead to some of the most elegant solutions with large increases in performance.

GRPO is that for post-training LLMs. In this article, after briefly introducing the advantage term and rollouts, I want to show you how intuitively designing the loss update for GRPO wouldn't disagree with rigor, and what that has to say about developing AI when data and compute are plentiful.

GRPO forgoes the actor-critic network of PPO by simply generating a group of $N$ responses, or, in the case of agents, trajectories/rollouts, from the LLM. We then grade each of these trajectories with a reward $R_i$ using a reward function. If we let $\bar R$ be the mean reward, then the advantage $A_i$ for a trajectory is defined as:

$$
\bar R = \frac{1}{N} \sum_{i=1}^{N} R_i
$$

$$
\sigma_R = \sqrt{\frac{1}{N} \sum_{i=1}^{N}(R_i - \bar R)^2}
$$

$$
A_i = \frac{R_i - \bar R}{\sigma_R + \epsilon}
$$

where $\epsilon$ is a small constant to avoid dividing by zero. Note that if all of the trajectories have the same reward, $\sigma_R$ and $R_i - \bar R$ will be zero, meaning there is effectively no advantage, which, as we'll see, leads to effectively no update to the policy. As such, we depend on some trajectories (due to randomness) being better than others for GRPO to work.
