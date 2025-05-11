'use client';

import { routes } from '@/app/routes';
import ConfirmationModal from '@/components/ConfirmationModal';
import ThreeDotMenu from '@/components/ThreeDotMenu';
import { deleteCampground } from '@/server/campgrounds';
import { Campground } from '@/types/campground';
import { DeleteIcon, EditIcon } from '@repo/ui/icons';
import { SelectOption } from '@repo/ui/select';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
interface CampgroundMenuProps {
  campground: Campground;
}

const CampgroundMenu = ({ campground }: CampgroundMenuProps) => {
  const router = useRouter();

  const [isCampgroundModalOpen, setIsCampgroundModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { _id: campgroundId, slug: campgroundSlug } = campground;

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
      label: 'Edit',
      value: 'edit',
      onClick: () => router.push(routes.campground.edit(campgroundSlug)),
      className: 'hover:bg-warning hover:text-white',
      icon: <EditIcon className="size-5" />,
    },
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
        description="Are you sure you want to delete this campground? All campground images will be deleted as well. This action cannot be undone."
        onConfirm={handleDeleteCampground}
        onClose={() => setIsCampgroundModalOpen(false)}
        isLoading={isLoading}
      />
    </>
  );
};

export default CampgroundMenu;
