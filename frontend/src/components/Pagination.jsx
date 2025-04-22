import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

const Pagination = (props) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="flex justify-center items-center border-t border-[#E8F5E9] pt-4 my-10">
      {props.currentPage > 1 && (
        <button
          onClick={() => props.prevPage()}
          className="bg-[#4CAF50] hover:bg-[#2E7D32] text-white p-2 rounded-xl transition-all duration-300 flex items-center justify-center"
        >
          <FaCaretLeft size={20} />
        </button>
      )}

      <span className="mx-4 text-[#1B3D1B] font-medium">
        Page {props.currentPage} of {pages.length}
      </span>

      {props.currentPage < pages.length && (
        <button
          onClick={() => props.nextPage()}
          className="bg-[#4CAF50] hover:bg-[#2E7D32] text-white p-2 rounded-xl transition-all duration-300 flex items-center justify-center"
        >
          <FaCaretRight size={20} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
