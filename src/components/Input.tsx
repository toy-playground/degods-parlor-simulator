import { useRef } from 'react';

interface InputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  onBlur?: () => void;
  className?: string;
  disabled?: boolean;
}

export const Input = ({
  value,
  onChange,
  placeholder,
  onBlur,
  className,
  disabled = false,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <input
      className={`font-apercu h-[40px]  min-w-[140px] max-w-[600px] rounded-none border !border-transparent bg-transparent px-4 text-center text-sm font-bold text-white !outline-none focus:!outline-none focus:ring-0 ${className} ${
        disabled ? ' cursor-not-allowed' : ''
      }`}
      placeholder={placeholder}
      value={value}
      ref={inputRef}
      disabled={disabled}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          inputRef.current?.blur();
          // handleLoadFilter();
        } else {
          return false;
        }
      }}
      onBlur={() => {
        onBlur?.();
      }}
    ></input>
  );
};

export const InputForm = ({
  value,
  onChange,
  placeholder,
  onBlur,
  desc,
  className: inputClassName,
  wrapperClassName,
}: InputProps & { desc: string; wrapperClassName?: string }) => {
  return (
    <div className={`flex w-full items-center gap-x-4 ${wrapperClassName}`}>
      <span className='w-[80px] select-none text-left'>{desc + ': '}</span>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        className={`${inputClassName} grow`}
      />
    </div>
  );
};
