'use client';
import { useState } from 'react';
import s from './style.module.scss';
import Image from 'next/image';
import CancelIcon from '@mui/icons-material/Cancel';
import ModalAddImg from '@/app/admin/add-product/ModalAddImg';
import { Button, Modal, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { list } from '@/data/NavList';
import { setProduct, updateProduct } from '@/app/actions';
import { saveBase64Image } from '@/utils/saveBase64Image';
import { updateImage } from '@/utils/updateImage';
import { ProductType } from '@/app/Types';
type Props = {
  product?: ProductType;
  formActions: string;
};
export default function ProductForm({ product, formActions }: Props) {
  const [croppedImg, setCroppedImg] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [noImg, setNoImg] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [imgServer, setImgServer] = useState(product?.img);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  function deleteImg() {
    setCroppedImg('');
  }
  function deleteImgServer(id: number | undefined) {
    if (id) {
      setImgServer(undefined);
      setNoImg(true);
    }
  }
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setOpen(true);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      console.log('Картинка добавлена:', file);
    } else {
      console.log('Картинка не выбрана');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = event.currentTarget;

    if (formActions === 'edit') {
      const result = await updateImage(croppedImg, imgServer, product?.img, setNoImg);
      if (result) {
        setNoImg(false);

        const data = {
          title: String(formData.get('title')),
          description: String(formData.get('description')),
          weight: Number(formData.get('weight')),
          calories: Number(formData.get('calories')),
          price: Number(formData.get('price')),
          structure: String(formData.get('structure')),
          category: String(formData.get('category')),
          img: String(result),
        };
        console.log(data);
        if (product?.id) {
          const resultSet = await updateProduct(product.id, data);
          if (resultSet?.status === true) {
            setCroppedImg('');
            form.reset();
            setAddProduct(true);
          }
        }
      }
    }

    if (formActions === 'add') {
      if (croppedImg !== '') {
        const result = await saveBase64Image(croppedImg);
        if (result) {
          setNoImg(false);

          const data = {
            title: String(formData.get('title')),
            description: String(formData.get('description')),
            weight: Number(formData.get('weight')),
            calories: Number(formData.get('calories')),
            price: Number(formData.get('price')),
            structure: String(formData.get('structure')),
            category: String(formData.get('category')),
            img: String(result),
          };
          console.log(data);

          const resultSet = await setProduct(data);
          if (resultSet?.status === true) {
            setCroppedImg('');
            form.reset();
            setAddProduct(true);
          }
        }
      } else {
        setNoImg(true);
      }
    }
  };
  return (
    <div className={s.wrapper}>
      <h1>{formActions === 'edit' ? 'Редактировать ' : 'Добавить '} товар</h1>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.title}>
          <label htmlFor="title">Названия товара</label>
          <input id="title" type="text" name="title" defaultValue={product?.title} required />
        </div>
        <div className={s.title}>
          <label htmlFor="description">Описания</label>
          <textarea
            id="description"
            rows={4}
            name="description"
            defaultValue={product?.descriptions}
            required
          />
        </div>
        <div className={s.title}>
          <label htmlFor="category">Выберите категорию:</label>
          <select
            id="category"
            className={s.category}
            name="category"
            required
            defaultValue={product?.category}
          >
            <option value="" disabled>
              Выбрать...
            </option>
            {list.map((item, index) => (
              <option key={index} value={item.url}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div className={s.title}>
          <label htmlFor="weight">Вес (в граммах)</label>
          <input id="weight" type="number" name="weight" defaultValue={product?.weight} required />
        </div>
        <div className={s.title}>
          <label htmlFor="calories">Сколько калорий</label>
          <input
            id="calories"
            type="number"
            name="calories"
            defaultValue={product?.calories}
            required
          />
        </div>
        <div className={s.title}>
          <label htmlFor="price">Цена</label>
          <input id="price" type="number" name="price" defaultValue={product?.price} required />
        </div>
        <div className={s.title}>
          <label htmlFor="structure">Состав</label>
          <textarea
            id="structure"
            rows={2}
            name="structure"
            defaultValue={product?.structure}
            required
          />
        </div>
        <div className={s.imgs}>
          <Button
            component="label"
            variant="contained"
            disabled={
              formActions === 'edit' ? Boolean(croppedImg) || Boolean(imgServer) : croppedImg !== ''
            }
            startIcon={<CloudUploadIcon />}
          >
            Добавить картинку
            <VisuallyHiddenInput type="file" onChange={handleImageUpload} />
          </Button>
          {noImg && (
            <p style={{ color: 'red', paddingTop: '10px' }}>
              * Изображения обязательно к добавлению
            </p>
          )}
          <ModalAddImg
            open={open}
            image={selectedImage}
            setCroppedImg={setCroppedImg}
            setOpen={setOpen}
            setNoImg={setNoImg}
          />
          {croppedImg != '' && (
            <div style={{ display: 'inline-block' }}>
              <CancelIcon className={s.icon} onClick={deleteImg} />
              <Image src={croppedImg} className={s.img} width={64} height={52} alt="" />
            </div>
          )}
          {imgServer && (
            <div style={{ display: 'inline-block' }}>
              <CancelIcon
                className={s.icon}
                onClick={() => {
                  deleteImgServer(product?.id);
                }}
              />
              <Image
                src={`/api/img?file=${product?.img}`}
                className={s.img}
                width={64}
                height={52}
                alt=""
              />
            </div>
          )}
        </div>
        <button className={s.button} type="submit">
          {formActions === 'edit' ? 'Обновить ' : 'Добавить '} товар
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </form>
      <Modal
        open={addProduct}
        onClose={() => {
          setAddProduct(false);
        }}
      >
        <div
          style={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'max-content',
            backgroundColor: 'green',
            border: '2px solid #000',
            padding: '15px',
            color: '#fff',
          }}
        >
          <h1>Статья успешно {formActions === 'add' ? 'добавлена' : 'обновлена'}</h1>
        </div>
      </Modal>
    </div>
  );
}
