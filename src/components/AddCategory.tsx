import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { categorysState } from "../atoms";

interface ICategory {
  category: string;
}

function AddCategory() {
  const { register, handleSubmit, setValue } = useForm<ICategory>();
  const [categorys, setCategorys] = useRecoilState(categorysState);
  const onValid = ({ category }: ICategory) => {
    setCategorys([...categorys, category]);
    setValue("category", "");
  };
  return (
    <>
      <h3>카테고리 추가</h3>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("category", {
            required: "카테고리를 작성해 주세요",
          })}
          placeholder="추가할 카테고리를 작성해 주세요"
        />
        <button>추가</button>
      </form>
    </>
  );
}

export default AddCategory;
