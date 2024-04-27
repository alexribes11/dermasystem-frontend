export type CustomInputParams= {
  name: string,
  type?: string,
  validator: (value: string) => string,
  isSelect?: true,
  options?: string[],
  label?: string
}

export type CustomInputs = CustomInputParams[];