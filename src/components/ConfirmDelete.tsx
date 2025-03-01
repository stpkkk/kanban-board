type Props = {
  content: string;
  onConfirm: () => void;
  onCloseModal?: () => void;
};

function ConfirmDelete({ content, onConfirm, onCloseModal }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl font-semibold">Удалить задачу?</h3>
      <p className="mb-5">{content}</p>

      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="border-gray w-full max-w-[202px] cursor-pointer rounded-sm border py-[9px]"
        >
          Удалить
        </button>
        <button
          onClick={onCloseModal}
          className="border-gray w-full max-w-[202px] cursor-pointer rounded-sm border py-[9px]"
        >
          Отменить
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
