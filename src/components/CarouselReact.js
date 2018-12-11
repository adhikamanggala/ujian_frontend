import React, { Component } from 'react';
import '../support/css/style.css';

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';

const items = [
  {
    src: 'image/rsz_1yogyakarta.jpg',
    caption: 'Candi Prambanan, Yogyakarta'
    
  },
  {
    src: 'image/Bihun-Kari-Tabona-Street_Pluit-5.jpg',
    altText: 'Slide 2',
    
  },
  {
    src: 'image/rsz_1yogyakarta.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];

class CarouselReact extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={items.caption} captionHeader={items.caption} />
        </CarouselItem>
      );
    });

    return (
        
      <Carousel
        style={{height:'10000'}}
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}

// const items = [
//   {
//     id: 1,
//     altText: 'Slide 1',
//     caption: 'Slide 1'
//   },
//   {
//     id: 2,
//     altText: 'Slide 2',
//     caption: 'Slide 2'
//   },
//   {
//     id: 3,
//     altText: 'Slide 3',
//     caption: 'Slide 3'
//   }
// ];

// class CarouselReact extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { activeIndex: 0 };
//     this.next = this.next.bind(this);
//     this.previous = this.previous.bind(this);
//     this.goToIndex = this.goToIndex.bind(this);
//     this.onExiting = this.onExiting.bind(this);
//     this.onExited = this.onExited.bind(this);
//   }

//   onExiting() {
//     this.animating = true;
//   }

//   onExited() {
//     this.animating = false;
//   }

//   next() {
//     if (this.animating) return;
//     const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
//     this.setState({ activeIndex: nextIndex });
//   }

//   previous() {
//     if (this.animating) return;
//     const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
//     this.setState({ activeIndex: nextIndex });
//   }

//   goToIndex(newIndex) {
//     if (this.animating) return;
//     this.setState({ activeIndex: newIndex });
//   }

//   render() {
//     const { activeIndex } = this.state;

//     const slides = items.map((item) => {
//       return (
//         <CarouselItem
//           className="custom-tag"
//           tag="div"
//           key={item.id}
//           onExiting={this.onExiting}
//           onExited={this.onExited}
//         >
//           <CarouselCaption className="text-danger" captionText={item.caption} captionHeader={item.caption} />
//         </CarouselItem>
//       );
//     });

//     return (
//       <div>
//         <style>
//           {
//             `.custom-tag {
//                 max-width: 100%;
//                 height: 700px;
//                 background: grey;
//               }`
//           }
//         </style>
//         <Carousel
//           activeIndex={activeIndex}
//           next={this.next}
//           previous={this.previous}
//         >
//           <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
//           {slides}
//           <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
//           <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
//         </Carousel>
//       </div>
//     );
//   }
// }


export default CarouselReact;