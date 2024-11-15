export enum ValidateField {
  Tel = 'tel',
  Name = 'name',
  Receive = 'receive',
  Address = 'address',
  Floor = 'floor',
}
export const Validate = (validate: ValidateField) => {
  const Tel = {
    required: {
      value: true,
      message: 'Поле обязательно для заполнения',
    },
    maxLength: {
      value: 11,
      message: 'Телефон должно быть не более 11 символов',
    },

    minLength: {
      value: 3,
      message: 'Телефон должно быть не менее 3 символов',
    },
  };
  const Name = {
    required: {
      value: true,
      message: 'Поле обязательно для заполнения',
    },
    maxLength: {
      value: 20,
      message: 'Имя должно быть не более 20 символов',
    },

    minLength: {
      value: 2,
      message: 'Имя должно быть не менее 2 символов',
    },
  };
  const Receive = {
    required: {
      value: true,
      message: 'Обязательно выберите способ доставки',
    },
  };
  const Address = {
    required: {
      value: true,
      message: 'Поле обязательно для заполнения',
    },
    maxLength: {
      value: 60,
      message: 'Адрес должно быть не более 60 символов',
    },

    minLength: {
      value: 8,
      message: 'Адрес должно быть не менее 8 символов',
    },
  };
  const Floor = {
    required: {
      value: true,
      message: 'Поле обязательно для заполнения',
    },
  };

  switch (validate) {
    case ValidateField.Tel:
      return Tel;
    case ValidateField.Name:
      return Name;
    case ValidateField.Receive:
      return Receive;
    case ValidateField.Address:
      return Address;
    case ValidateField.Floor:
      return Floor;
    default:
  }
};
