import Modal from 'react-modal';
import { FC, useEffect, useState } from 'react';
import { getContent } from '../../helper/axiosInstance';
import { TenderDetail } from './type';
import { FaExternalLinkAlt, FaFileAlt, FaTimes } from 'react-icons/fa';

type TenderDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

const TenderDetailModal: FC<TenderDetailModalProps> = ({ isOpen, onClose, id }) => {
  const [tenderDetail, setTenderDetail] = useState<TenderDetail | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchTenderDetailsById = async (id: string) => {
    setIsFetching(true);
    const data = await getContent<TenderDetail>(`tenders/${id}`);
    setTenderDetail(data);
    setIsFetching(false);
  };

  useEffect(() => {
    if (!id) return;


    fetchTenderDetailsById(id);

    return () => {
      setTenderDetail(null);
      setIsFetching(false);
    };

  }, [id]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Tender Details"
      shouldCloseOnOverlayClick={true}
      className="bg-white shadow-[0_0_30px_rgba(0,0,0,0.2)] rounded-2xl p-6 w-full max-w-3xl mx-auto overflow-y-auto max-h-[90vh]"
      overlayClassName="fixed inset-0 flex items-center justify-center z-50 bg-black/30"
    >
      {
        isFetching && (
          <TenderDetailSkeleton />
        )
      }
      {
        !isFetching && tenderDetail ? (
          <div className="space-y-6 pointer-events-auto">
            <h2 className="text-3xl font-bold text-purple-700 text-center mb-4 flex items-center justify-center gap-3">
              <FaFileAlt className="text-purple-700" size={26} />
              Tender Details
            </h2>

            <InfoCard label="Title" value={tenderDetail.title} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard label="Category" value={tenderDetail.category} />
              <InfoCard label="Published On" value={tenderDetail.date} />
              <InfoCard label="Deadline" value={tenderDetail.deadline_date} />
              <InfoCard label="Duration" value={`${tenderDetail.deadline_length_days} days`} />
              <InfoCard label="Tender Type" value={tenderDetail.type?.name ?? 'N/A'} />
              <InfoCard label="Notice Type" value={tenderDetail.notices?.[0]?.data?.type ?? 'N/A'} />
              <InfoCard label="Supplier" value={tenderDetail.awarded?.[0]?.suppliers_name ?? 'N/A'} />
              <InfoCard label="Awarded Value" value={`€${tenderDetail.awarded?.[0]?.value ?? 'N/A'}`} />
              <InfoCard label="Offers Count" value={`${tenderDetail.awarded?.[0]?.offers_count ?? 0}`} />
            </div>

            <a
              href={tenderDetail.src_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-blue-600 underline font-medium"
            >
              <FaExternalLinkAlt />
              View Source
            </a>

            <div className="text-center">
              <button
                className="mt-6 bg-gradient-to-r from-green-500 to-teal-500 px-6 py-2 text-white rounded-full hover:scale-105 transition-transform shadow-md flex items-center gap-2 justify-center mx-auto"
                onClick={onClose}
              >
                <FaTimes />
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-red-500 flex items-center justify-center gap-2 mt-4">
            <FaTimes className="text-red-500" />
            Unable to load tender details. Please try again.
            <button
              onClick={() => id && fetchTenderDetailsById(id)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        )
      }
    </Modal >
  );
};

type InfoCardProps = {
  label: string;
  value: string;
};

const InfoCard: FC<InfoCardProps> = ({ label, value }) => (
  <div className="bg-gray-50 border-l-4 border-purple-400 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
    <p className="text-sm text-gray-500 font-medium">{label}</p>
    <p className="text-base text-gray-800 font-semibold mt-1 break-words">{value}</p>
  </div>
);

const TenderDetailSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-8 bg-purple-100 rounded w-2/3 mx-auto" />
    <div className="h-6 bg-gray-200 rounded w-full" />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Array.from({ length: 9 }).map((_, idx) => (
        <div
          key={`skeleton-${idx}`}
          className="bg-gray-100 border-l-4 border-gray-300 p-4 rounded-lg shadow-sm space-y-2"
        >
          <div className="h-4 w-1/3 bg-gray-300 rounded" />
          <div className="h-5 w-2/3 bg-gray-300 rounded" />
        </div>
      ))}
    </div>

    <div className="h-4 w-32 bg-blue-100 rounded mx-auto mt-4" />
    <div className="h-10 w-24 bg-green-200 rounded-full mx-auto mt-6" />
  </div>
);


export default TenderDetailModal;
