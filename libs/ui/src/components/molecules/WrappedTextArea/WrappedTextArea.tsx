import { useFormContext } from 'react-hook-form';
import { Buildable, Field } from '../../../types/formAndField';
import { TextArea } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedTextArea = ({
  id,
  rules,
  helperText,
  long,
  full,
  icon,
  success,
  warning,
  error,
  number,
  address,
  className,
  placeholder,
  defaultValue,
  value,
  disabled,
  hidden,
  rightAddon,
  label,
  loading,
  info,
}: Buildable<Field>) => {
  const { register } = useFormContext();
  return (
    <FieldWrapper
      helperText={helperText}
      label={label}
      loading={loading}
      info={info}
      error={error}
      success={success}
      warning={warning}
      hidden={hidden}
      long={long}
      full={full}
      address={address}
      rightAddon={rightAddon}
      id={id}
      rules={rules}
    >
      <TextArea
        {...register(id, rules)}
        id={id}
        long={long}
        full={full}
        icon={icon}
        success={success}
        warning={warning}
        error={error}
        number={number}
        address={address}
        className={className}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        hidden={hidden}
      />
    </FieldWrapper>
  );
};
