import { FC } from 'react';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';

type BreadcrumbsProps = {
  currentPage?: string;
};

const BreadCrumbs: FC<BreadcrumbsProps> = ({ currentPage }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/">
        Home
      </Link>
      {currentPage && (
        <Typography color="textPrimary">{currentPage}</Typography>
      )}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
