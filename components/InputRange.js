export default function InputRange({ value, onChange }) {
  return (
    <div className="w-96 lg:w-full">
      <input
        type="range"
        min="0"
        max="100"
        // name="c1c2"
        value={value}
        onChange={onChange}
        step="6.25"
        className="cursor-pointer w-full form-range appearance-none rounded-md h-3 p-0 bg-gray-300 focus:outline-none focus:ring-0 focus:shadow-none"
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>9</span>
        <span>7</span>
        <span>5</span>
        <span>3</span>
        <span>1</span>
        <span>3</span>
        <span>5</span>
        <span>7</span>
        <span>9</span>
      </div>
    </div>
  );
}
