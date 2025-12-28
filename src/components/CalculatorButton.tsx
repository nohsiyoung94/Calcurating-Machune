export default function CalculatorButton({
  value,
  className,
  onClick,
}: ButtonConfig) {
  return (
    <>
      <input
        type="button"
        className={className}
        value={value}
        onClick={onClick}
      />
    </>
  );
}
