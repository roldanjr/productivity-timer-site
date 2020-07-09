import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import LazyLoad from "react-lazyload";
import {
  StyledRoadMap,
  StyledRoadMapList,
  StyledRoadMapItem,
  StyledShowMore,
  StyledRoadMapContent,
} from "styles";
import { SVG, Header, Preloader } from "components";
import { MarkDownProps } from "types";

const RoadMap: React.FC = () => {
  const { allMarkdownRemark } = useStaticQuery<MarkDownProps>(graphql`
    {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/roadMap/" } }) {
        edges {
          node {
            frontmatter {
              title
              subTitle
              featureList {
                icon
                heading
                description
              }
            }
          }
        }
      }
    }
  `);

  const [limit, setLimit] = useState(5);

  const { frontmatter } = allMarkdownRemark.edges[0].node;

  const renderLastItem = () => {
    if (frontmatter.featureList && frontmatter.featureList.length > limit) {
      return (
        <StyledRoadMapItem
          onClick={() => {
            setLimit(prevLimit => prevLimit + 6);
          }}
        >
          <h3>
            <SVG name="more" />
            Show more...
          </h3>
        </StyledRoadMapItem>
      );
    }
    return (
      <StyledRoadMapItem>
        <h3>
          <SVG name="more" />
          More of it soon...
        </h3>
      </StyledRoadMapItem>
    );
  };

  return (
    <StyledRoadMap id="road-map">
      <LazyLoad once={true} offset={80} height="58.3rem">
        <StyledRoadMapContent>
          <Header frontMatter={frontmatter} />

          <StyledRoadMapList>
            {frontmatter.featureList
              ?.map((feature, index) => (
                <StyledRoadMapItem key={index}>
                  <h3>
                    <SVG name={feature.icon} />
                    {feature.heading}
                  </h3>
                  <p>{feature.description}</p>
                </StyledRoadMapItem>
              ))
              .splice(0, limit)}
            {renderLastItem()}
          </StyledRoadMapList>
        </StyledRoadMapContent>
      </LazyLoad>
    </StyledRoadMap>
  );
};

export default RoadMap;
