1- Think of a list of mutators:

- Random character change: to test the control key.
- Add a randomly invalid character.
- Add a random number to the pass.
- A mutator for each part of the EID:
  - Sex mutator.
  - Year mutator: except this one.
  - Serial mutator: replace with the invalid "000".
  - Control key mutator: invert the two characters.

2- Add a couple of mutators for the control key to distinguish:

- Invalid by nature: For example, values greater than 98.
- Bad calculation: Simulate errors in the computation logic.

3 - This is a good exercise because I often write mutators that fail to generate invalid EIDs. It’s a helpful perspective to focus on the job’s rules.
