'use client';

import ConfirmationModal from '@/components/ConfirmationModal';
import ThreeDotMenu from '@/components/ThreeDotMenu';
import { deleteCampground } from '@/server/campgrounds';
import { Campground } from '@/types/campground';
import { DeleteIcon } from '@repo/ui/icons';
import { SelectOption } from '@repo/ui/select';
import { useState } from 'react';

interface CampgroundMenuProps {
  campgroundId: Campground['_id'];
}

const CampgroundMenu = ({ campgroundId }: CampgroundMenuProps) => {
  const [isCampgroundModalOpen, setIsCampgroundModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteCampground = async () => {
    if (!campgroundId) {
      setIsCampgroundModalOpen(false);
      return;
    }

    setIsLoading(true);

    try {
      await deleteCampground(campgroundId);
    } catch (error) {
      console.error('Error liking review:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const options: SelectOption[] = [
    {
      label: 'Delete',
      value: 'delete',
      onClick: () => setIsCampgroundModalOpen(true),
      className: 'hover:bg-danger hover:text-white',
      icon: <DeleteIcon className="size-5" />,
    },
  ];

  return (
    <>
      <ThreeDotMenu options={options} />

      <ConfirmationModal
        isHidden={!isCampgroundModalOpen}
        title="Delete Campground"
        description="Are you sure you want to delete this campground? This action cannot be undone."
        onConfirm={handleDeleteCampground}
        onClose={() => setIsCampgroundModalOpen(false)}
        isLoading={isLoading}
      />
    </>
  );
};

export default CampgroundMenu;
