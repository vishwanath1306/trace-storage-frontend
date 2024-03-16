
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { classNames } from 'primereact/utils';

export const getCheckBox = (options, selectedOptions, setSelectedOptions) => {
    return (
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-3">
                {options.map((option) => {
                    return (
                        <div key={option.key} className="flex align-items-center">
                            <Checkbox inputId={option.key}
                                name="option"
                                value={option}
                                onChange={(e) => onCheckBoxChange(e, selectedOptions, setSelectedOptions)}
                                checked={selectedOptions.some((item) => item.key === option.key)}
                            />
                            <label htmlFor={option.key} className="ml-2">
                                {option.name}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


export const getRadioButton = (options, selectedOption, setSelectedOption) => {
    return (
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-3">
                {options.map((option) => {
                    return (
                        <div key={option.key} className="flex align-items-center">
                            <RadioButton inputId={option.key}

                                name="option"
                                value={option}
                                onChange={(e) => onRadioButtonChange(e, selectedOption, setSelectedOption)}
                                checked={selectedOption.key === option.key}
                            />
                            <label htmlFor={option.key} className="ml-2">
                                {option.name}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


export const getRadioButtonHookForm = (options, field, fieldState) => {
    return (
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-3">
                {options.map((option) => {
                    return (
                        <div key={option.key} className="flex align-items-center">
                            <RadioButton
                                inputId={option.name} {...field}
                                inputRef={field.ref}
                                value={option.name}
                                checked={field.value === option.name}
                                onChange={(e) => field.onChange(e.value)}
                                className={classNames({ 'p-invalid': fieldState.error })}
                            />
                            <label htmlFor={option.key} className="ml-2">
                                {option.name}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}



export const onCheckBoxChange = (e, selectedCategories, setSelectedCategories) => {
    let _selectedCategories = [...selectedCategories];

    if (e.checked)
        _selectedCategories.push(e.value);
    else
        _selectedCategories = _selectedCategories.filter(category => category.key !== e.value.key);

    setSelectedCategories(_selectedCategories);
};

export const onRadioButtonChange = (e, selectedCategory, setSelectedCategory) => {
    setSelectedCategory(e.value);
}

