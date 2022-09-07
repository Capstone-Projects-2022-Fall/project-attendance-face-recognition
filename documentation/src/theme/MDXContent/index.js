import React from 'react';
import MDXContent from '@theme-original/MDXContent';
import Admonition from '@theme/Admonition';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ForReview from "../../components/ForReview";

export default function MDXContentWrapper(props) {
    const {siteConfig} = useDocusaurusContext();

    return (
    <>
        <ForReview/>
      <MDXContent {...props} />
    </>
  );
}
