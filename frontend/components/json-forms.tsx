import React from 'react';
import { ArrayFieldTemplateProps, ArrayFieldTemplateItemType, FieldTemplateProps, SubmitButtonProps, getSubmitButtonOptions, DescriptionFieldProps, WidgetProps, ObjectFieldTemplateProps } from '@rjsf/utils';
import { withTheme, ThemeProps } from '@rjsf/core';
import { Button, ButtonGroup, Textarea } from '@nextui-org/react';
import { FaAngleDown, FaAngleUp, FaMinus, FaPlus } from 'react-icons/fa6';
import { SingleSelect } from './base/single-select';
import { toast } from 'sonner';


// entire array field
function ArrayFieldTemplate({ items, canAdd, onAddClick, readonly, rawErrors, ...props }: ArrayFieldTemplateProps) {
  return (
    <div className=''>
      {/* <div className='mt-5 text-primary/100 font-bold'>
        {props.title}
      </div> */}
      <div className='flex flex-col gap-1 pl-2 border-l-1 border-primary/100'>
        {
          items.map(({ key, ...p }) => {
            return (
              <ArrayFieldItemTemplate key={key} {...p} />
            )
          })
        }
        {
          canAdd && !readonly &&
          <Button fullWidth size='sm' onClick={onAddClick} >
            <FaPlus />
          </Button>
        }
        {
          (rawErrors?.length ?? 0) > 0 &&
          <div className='text-red-500'>
            {JSON.stringify(rawErrors)}
          </div>
        }
      </div>
    </div>
  );
}

// single array item
function ArrayFieldItemTemplate({ children, className, hasMoveUp, hasMoveDown, hasRemove, readonly, ...props }: ArrayFieldTemplateItemType) {
  return (
    <div className='flex flex-row gap-1 items-center justify-between'>
      <div className='grow [&_.control-label]:hidden'>
        {children}
      </div>

      {!readonly &&

        <ButtonGroup>
          <Button isIconOnly size='sm' isDisabled={!hasMoveUp || readonly} onClick={props.onReorderClick(props.index, props.index - 1)}>
            <FaAngleUp />
          </Button>

          <Button isIconOnly size='sm' isDisabled={!hasMoveDown || readonly} onClick={props.onReorderClick(props.index, props.index + 1)}>
            <FaAngleDown />
          </Button>

          <Button isIconOnly size='sm' isDisabled={!hasRemove || readonly} onClick={props.onDropIndexClick(props.index)}>
            <FaMinus />
          </Button>
        </ButtonGroup>
      }
    </div>
  )
}

function FieldTemplate(props: FieldTemplateProps) {
  const { id, classNames, style, label, help, required, description, errors, children } = props;
  return (
    <div className='' style={style}>
      {/* <div className='text-red-500'>
        {label}
        {required ? '[*]' : null}
      </div> */}
      {description}
      <div className=''>
        {children}
      </div>
      {errors}
      {help}
    </div>
  );
}

function ObjectFieldTemplate(props: ObjectFieldTemplateProps) {
  const titleCase = (s: string) =>
    s.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())       // Initial char (after -/_)
      .replace(/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase()) // First char after each -/_

  return (
    <div>
      {/* {props.title} */}
      {/* {props.description} */}
      {
        props.properties.map((element, i) => (
          <div key={i} className='mb-4'>
            <div className='text-xs font-bold text-primary/100 mb-1'>
              {titleCase(element.name)}
            </div>
            {element.content}
          </div>
        ))
      }
    </div>
  );
}

function DescriptionFieldTemplate(props: DescriptionFieldProps) {
  const { description, id } = props;
  return (
    // description &&
    // <Tooltip content={description}>
    //   <button>
    //     <FaCircleInfo />
    //   </button>
    // </Tooltip>
    null
  );
}

function SubmitButton(props: SubmitButtonProps) {
  const { uiSchema } = props;
  const { norender } = getSubmitButtonOptions(uiSchema);
  if (norender) {
    return null;
  }
  return (
    <Button type='submit' color='primary'>
      Submit
    </Button>
  );
}

const SelectWidget = ({ id, label, placeholder, required, value, readonly, onChange, options }: WidgetProps) => {
  return (
    <SingleSelect
      id={id}
      // label={label}
      label={null}
      labelPlacement='outside'
      placeholder={placeholder}
      isRequired={required}
      isDisabled={readonly}
      selected={value}
      setSelected={onChange}
      valList={options.enumOptions?.map((item) => item.value) || []}
    />
  );
};

const TextWidget = ({ id, label, placeholder, required, value, readonly, onChange, rawErrors }: WidgetProps) => {
  return (
    <Textarea
      id={id}
      // label={label}
      isRequired={required}
      value={value}
      placeholder={placeholder}
      isDisabled={readonly}
      onChange={(e) => onChange(e.target.value)}
      minRows={1}
      maxRows={10}
      isInvalid={(rawErrors?.length ?? 0) > 0}
      errorMessage={rawErrors}
    />
  );
}


const theme: ThemeProps = {
  widgets: {
    SelectWidget,
    TextWidget
  },
  templates: {
    ArrayFieldTemplate,
    FieldTemplate,
    ObjectFieldTemplate,
    DescriptionFieldTemplate,
    ButtonTemplates: {
      SubmitButton,
    }
  }
};

export const Form = withTheme(theme);
