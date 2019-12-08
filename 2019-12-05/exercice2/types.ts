export enum OpCode {
  END = 99,
  ADD = 1,
  MULTIPLY = 2,
  SET = 3,
  OUTPUT = 4,
  JUMP_IF_TRUE = 5,
  JUMP_IF_FALSE = 6,
  LESS_THAN = 7,
  EQUALS = 8,
}

export enum ParameterMode {
  POSITION = 0,
  IMMEDIATE = 1,
}
